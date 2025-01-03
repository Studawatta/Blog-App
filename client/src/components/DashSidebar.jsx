import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashSidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <div className="flex flex-col gap-1">
              <Link to={'/dashboard?tab=posts'}>
                <Sidebar.Item
                  active={tab === 'posts'}
                  icon={HiDocumentText}
                  as="div"
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to={'/dashboard?tab=users'}>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiDocumentText}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </div>
          )}

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
